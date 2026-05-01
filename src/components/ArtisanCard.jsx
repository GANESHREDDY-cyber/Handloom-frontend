import { Link } from "react-router-dom";
import { FiStar, FiPackage } from "react-icons/fi";

export default function ArtisanCard({ artisan }) {
  const { id, name, location, specialty, avatar, rating, productCount, story } = artisan;
  return (
    <Link to={`/artisans/${id}`} className="card group p-6 flex flex-col items-center text-center hover:border-maroon border border-transparent transition-all">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-gold/30 group-hover:ring-maroon/40 transition-all">
        <img src={avatar || `https://ui-avatars.com/api/?name=${name}&background=800020&color=fff`} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="font-semibold text-brown mb-1">{name}</h3>
      <p className="text-xs text-gold font-medium mb-1">{specialty}</p>
      <p className="text-xs text-gray-500 mb-3">📍 {location}</p>
      <p className="text-xs text-gray-600 line-clamp-2 mb-4">{story}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1"><FiStar className="text-gold" /> {rating || "4.8"}</span>
        <span className="flex items-center gap-1"><FiPackage /> {productCount || 0} products</span>
      </div>
    </Link>
  );
}
