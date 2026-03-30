alter table public.specialists
  add column if not exists slug text;

with prepared as (
  select
    id,
    created_at,
    coalesce(
      nullif(
        trim(
          both '-'
          from regexp_replace(
            regexp_replace(
              lower(
                translate(
                  trim(full_name),
                  'ąčęėįšųūžĄČĘĖĮŠŲŪŽ',
                  'aceeisuuzACEEISUUZ'
                )
              ),
              '[^a-z0-9\s-]+',
              '',
              'g'
            ),
            '[\s_-]+',
            '-',
            'g'
          )
        ),
        ''
      ),
      'specialist'
    ) as base_slug
  from public.specialists
),
ranked as (
  select
    id,
    case
      when row_number() over (
        partition by base_slug
        order by created_at asc, id asc
      ) = 1
        then base_slug
      else base_slug || '-' || row_number() over (
        partition by base_slug
        order by created_at asc, id asc
      )
    end as resolved_slug
  from prepared
)
update public.specialists as specialists
set slug = ranked.resolved_slug
from ranked
where specialists.id = ranked.id
  and (specialists.slug is null or btrim(specialists.slug) = '');

alter table public.specialists
  alter column slug set not null;

create unique index if not exists idx_specialists_slug on public.specialists(slug);
