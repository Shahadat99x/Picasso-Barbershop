import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { BranchData } from '@/data/branches';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface BranchCardProps {
  branch: BranchData;
}

export function BranchCard({ branch }: BranchCardProps) {
  return (
    <Card className="flex flex-col h-full bg-white shadow-sm border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-6 pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-900 font-display">
          {branch.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2 flex-grow space-y-4">
        <p className="text-gray-600 line-clamp-3">
          {branch.intro}
        </p>
        
        <div className="space-y-3 pt-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <span>{branch.address}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              {branch.hours.slice(0, 2).map((h, i) => (
                <div key={i}>{h.day}: {h.time}</div>
              ))}
              {branch.hours.length > 2 && (
                <div className="text-gray-500 text-xs mt-1">
                  +{branch.hours.length - 2} more
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-4 mt-auto flex gap-3 flex-wrap">
        <Link href={`/filialai/${branch.slug}`} className="flex-1 min-w-[120px]">
          <Button className="w-full" size="lg">
            View Details
          </Button>
        </Link>
        <Link href="#book" className="flex-1 min-w-[120px]">
          <Button variant="outline" className="w-full" size="lg">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
