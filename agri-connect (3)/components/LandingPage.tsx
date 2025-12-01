import React, { useState, useEffect, useCallback } from 'react';
import { LeafIcon } from './shared/icons/LeafIcon';
import Button from './shared/Button';
import { ChevronLeftIcon } from './shared/icons/ChevronLeftIcon';
import { ChevronRightIcon } from './shared/icons/ChevronRightIcon';
import { BrainIcon } from './shared/icons/BrainIcon';
import { HandshakeIcon } from './shared/icons/HandshakeIcon';
import { UsersIcon } from './shared/icons/UsersIcon';
import { TrendingUpIcon } from './shared/icons/TrendingUpIcon';
import { ClipboardListIcon } from './shared/icons/ClipboardListIcon';
import { FacebookIcon } from './shared/icons/FacebookIcon';
import { TwitterIcon } from './shared/icons/TwitterIcon';
import { LinkedInIcon } from './shared/icons/LinkedInIcon';
import ThemeSwitcher from './shared/ThemeSwitcher';


interface LandingPageProps {
  onEnterPortal: () => void;
}

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop',
    title: 'Advanced Agricultural Solutions',
    subtitle: 'High-performing products that keep turf areas beautiful and healthy.'
  },
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
    title: 'Connecting Farmers to Markets',
    subtitle: 'A digital ecosystem for modern agriculture, fostering direct trade.'
  },
  {
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop',
    title: 'Sustainable & Smart Farming',
    subtitle: 'Leverage technology for better yields and a healthier planet.'
  }
];

const FeatureCircle: React.FC<{imageUrl: string, title: string, alt: string}> = ({imageUrl, title, alt}) => (
    <div className="flex flex-col items-center text-center group">
        <div className="relative w-64 h-64 transform group-hover:scale-105 transition-transform duration-300">
            <img className="w-full h-full rounded-full object-cover ring-8 ring-white dark:ring-gray-700 shadow-lg" src={imageUrl} alt={alt} />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-6 mb-3">{title}</h3>
        <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
            Read More
        </button>
    </div>
);

const InfoFeature: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h4>
      <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const StatCard: React.FC<{icon: React.ReactNode, value: string, label: string}> = ({ icon, value, label }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400 p-4 rounded-full mb-4">
      {icon}
    </div>
    <p className="text-4xl font-extrabold text-gray-800 dark:text-white">{value}</p>
    <p className="text-md text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-2">{label}</p>
  </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <header className="w-full bg-white dark:bg-gray-900 shadow-md relative z-30">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <LeafIcon className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">Agri-Connect</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <a href="#" className="hover:text-green-500">About</a>
            <a href="#" className="hover:text-green-500">Products</a>
            <a href="#" className="hover:text-green-500">Services</a>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button onClick={onEnterPortal}>Portal Login</Button>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] w-full overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-200 drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex justify-center gap-4">
                <Button onClick={onEnterPortal} className="px-8 py-3 text-lg">Enter Portal</Button>
                <Button variant="secondary" className="px-8 py-3 text-lg bg-white/20 backdrop-blur-sm !text-white hover:bg-white/30">Learn More</Button>
            </div>
          </div>
          <button onClick={prevSlide} className="absolute top-1/2 left-4 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition">
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button onClick={nextSlide} className="absolute top-1/2 right-4 z-20 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition">
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </section>

        {/* Focus Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 text-center">
                <p className="text-green-600 font-semibold tracking-wide uppercase">OUR FOCUS</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-16">Innovation in Modern Agriculture</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8">
                    <FeatureCircle
                        imageUrl="https://media.istockphoto.com/id/1469639791/photo/farmer-using-digital-tablet-in-corn-crop-cultivated-field-with-smart-farming-interface-icons.jpg?s=612x612&w=0&k=20&c=CEnLHATfACNoH_N3Ru5KoTOmAc5SbufJozvV_kcuwc4="
                        alt="A scientist examining a plant in a modern research lab"
                        title="Research & Development"
                    />
                    <FeatureCircle
                        imageUrl="https://etedge-insights.com/wp-content/uploads/2024/06/agri-drone.jpg"
                        alt="Hands holding a seedling in a high-tech greenhouse"
                        title="Technologies & Partnering"
                    />
                    <FeatureCircle
                        imageUrl="https://asqi.in/wp-content/uploads/2024/11/Sustainable-Agriculture-In-India.jpg"
                        alt="A close-up of a variety of agricultural seeds"
                        title="Agricultural Seeds"
                    />
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-green-600 font-semibold tracking-wide uppercase">WHY CHOOSE US</p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">A Digital Ecosystem for Modern Agriculture</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Agri-Connect is more than just a platform; it's a community-driven ecosystem designed to empower farmers and streamline the agricultural supply chain.
                </p>
                <div className="space-y-6">
                  <InfoFeature icon={<BrainIcon />} title="Data-Driven Decisions" description="Leverage AI-powered insights for crop health, weather patterns, and market trends to maximize your yield." />
                  <InfoFeature icon={<HandshakeIcon />} title="Direct Market Access" description="Connect directly with marketers and buyers, ensuring fair prices and transparent transactions." />
                  <InfoFeature icon={<UsersIcon />} title="Community & Support" description="Share knowledge, ask questions, and build relationships with a network of fellow agricultural professionals." />
                </div>
              </div>
              <div className="relative h-96 group">
                <img src="https://eng.ruralvoice.in/uploads/images/2024/09/image_750x_66d864decc1a8.jpg" className="w-full h-full object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300" alt="Close-up of a farmer using a tablet in a cornfield" />
              </div>
            </div>
          </div>
        </section>

        {/* Farming by the Numbers Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <p className="text-green-600 font-semibold tracking-wide uppercase">OUR IMPACT</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-16">Farming by the Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard icon={<UsersIcon />} value="5M+" label="Farmers Connected" />
                <StatCard icon={<TrendingUpIcon />} value="30%" label="Increase in Crop Yield" />
                <StatCard icon={<ClipboardListIcon />} value="10K+" label="Active Market Listings" />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 dark:bg-black text-white">
        <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="col-span-2 lg:col-span-1">
                    <div className="flex items-center gap-3">
                        <LeafIcon className="h-8 w-8 text-green-500" />
                        <span className="text-2xl font-bold tracking-tight">Agri-Connect</span>
                    </div>
                    <p className="text-gray-400 mt-4 text-sm">Cultivating the future of agriculture through technology and community.</p>
                </div>
                <div>
                    <h4 className="font-semibold tracking-wider uppercase">Solutions</h4>
                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Crop Management</a></li>
                        <li><a href="#" className="hover:text-white">Marketplace</a></li>
                        <li><a href="#" className="hover:text-white">Analytics</a></li>
                        <li><a href="#" className="hover:text-white">Community</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold tracking-wider uppercase">Support</h4>
                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="#" className="hover:text-white">Help Center</a></li>
                        <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-semibold tracking-wider uppercase">Legal</h4>
                    <ul className="mt-4 space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>
                 <div className="col-span-2 md:col-span-1">
                    <h4 className="font-semibold tracking-wider uppercase">Follow Us</h4>
                    <div className="flex mt-4 space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white"><FacebookIcon /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><TwitterIcon /></a>
                        <a href="#" className="text-gray-400 hover:text-white"><LinkedInIcon /></a>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                <p>&copy; 2024 Agri-Connect. All Rights Reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;