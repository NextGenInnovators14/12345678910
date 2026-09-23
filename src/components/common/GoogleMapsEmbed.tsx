import React, { useMemo } from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

interface GoogleMapsEmbedProps {
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  title?: string;
  zoom?: number;
  className?: string;
  height?: string;
  showCardHeader?: boolean;
}

export const GoogleMapsEmbed: React.FC<GoogleMapsEmbedProps> = ({
  address,
  coordinates,
  title = 'Property Location',
  zoom = 15,
  className = '',
  height = '360px',
  showCardHeader = true,
}) => {
  const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY;

  // Determine the primary query for Google Maps
  const queryParam = useMemo(() => {
    if (coordinates && coordinates.lat && coordinates.lng) {
      return `${coordinates.lat},${coordinates.lng}`;
    }
    if (address && address.trim().length > 0) {
      return `${address.trim()}, Chhatrapati Sambhajinagar, Maharashtra, India`;
    }
    return 'Chhatrapati Sambhajinagar, Maharashtra, India';
  }, [coordinates, address]);

  // Construct iframe embed URL with the mandatory tracking attribution parameter
  const embedUrl = useMemo(() => {
    const encoded = encodeURIComponent(queryParam);
    if (apiKey) {
      return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(apiKey)}&solution_id=gmp_mcp_codeassist_v1_aistudio&q=${encoded}&zoom=${zoom}`;
    }
    // Reliable fallback for preview & development without requiring an immediate Google Cloud API key
    return `https://maps.google.com/maps?q=${encoded}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
  }, [apiKey, queryParam, zoom]);

  // External Google Maps directions URL with mandatory attribution
  const externalMapsUrl = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryParam)}&utm_campaign=gmp_mcp_codeassist_v1_aistudio`;
  }, [queryParam]);

  return (
    <div className={`bg-white rounded-2xl border border-[#E2DAC6] overflow-hidden shadow-xs ${className}`}>
      {showCardHeader && (
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#1E4FA8]/10 flex items-center justify-center text-[#1E4FA8] shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#F2621E]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">{title}</h3>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-[#1E4FA8] border border-blue-200">
                  Google Maps
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 line-clamp-2">
                {address || 'Chhatrapati Sambhajinagar, Maharashtra, India'}
              </p>
              {coordinates && (
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Lat: {coordinates.lat.toFixed(5)}, Lng: {coordinates.lng.toFixed(5)}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={externalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#1E4FA8] text-slate-700 hover:text-white text-xs font-bold transition-all border border-slate-200 shadow-2xs group"
              title="Open location in Google Maps app"
            >
              <Navigation className="w-3.5 h-3.5 text-[#F2621E] group-hover:text-white transition-colors" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white/80" />
            </a>
          </div>
        </div>
      )}

      {/* Interactive Map Iframe Container */}
      <div className="relative w-full overflow-hidden bg-slate-100" style={{ height }}>
        <iframe
          title={title}
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: height }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Subtle Overlay Badge */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs text-[11px] font-semibold text-slate-700 flex items-center space-x-1.5 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-[#1E4FA8]" />
          <span>Interactive Pin View</span>
        </div>
      </div>
    </div>
  );
};
