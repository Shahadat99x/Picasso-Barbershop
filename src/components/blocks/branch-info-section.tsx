import { MapPin, Phone, Mail, Clock, Car, Train } from 'lucide-react';
import { BranchData } from '@/data/branches';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BranchInfoSectionProps {
  branch: BranchData;
}

export function BranchInfoSection({ branch }: BranchInfoSectionProps) {
  return (
    <section className="grid gap-8 lg:grid-cols-2 lg:gap-12 w-full max-w-7xl mx-auto items-start">
      {/* Contact & Hours */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-display font-semibold mb-6">Contact & Location</h2>
          <Card className="border-0 shadow-sm bg-gray-50/50">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span className="text-lg">{branch.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href={`tel:${branch.phone.replace(/\s+/g, '')}`} className="text-lg hover:text-primary transition-colors">
                  {branch.phone}
                </a>
              </div>
              {branch.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <a href={`mailto:${branch.email}`} className="text-lg hover:text-primary transition-colors">
                    {branch.email}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Opening Hours
          </h3>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <ul className="space-y-3">
                {branch.hours.map((h, i) => (
                  <li key={i} className="flex justify-between items-center text-gray-600 border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                    <span className="font-medium">{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Placeholder & Transport Info */}
      <div className="space-y-8">
        <div className="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] lg:aspect-auto lg:h-[400px] border border-gray-200 relative group flex items-center justify-center">
            {/* Minimal Map Placeholder for Phase 2c/3 */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900/0 to-transparent"></div>
            <div className="text-center space-y-4 px-6 relative z-10 w-full max-w-sm">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2 opacity-50" />
                <p className="text-gray-500 font-medium">Interactive Map Integration Pending</p>
                <p className="text-sm text-gray-400">Map modules will be integrated in a later interactive phase (see Phase Decisions).</p>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="mt-4 w-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white">
                    Open in Google Maps
                  </Button>
                </a>
            </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
           <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                <Car className="w-4 h-4 text-gray-500" />
                Parking
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{branch.parkingInfo}</p>
           </div>
           
           <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2 text-gray-900">
                <Train className="w-4 h-4 text-gray-500" />
                Public Transport
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{branch.transportInfo}</p>
           </div>
        </div>
      </div>
    </section>
  );
}
