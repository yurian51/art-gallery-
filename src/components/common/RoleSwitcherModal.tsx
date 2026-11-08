import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { X, Shield, Palette, Eye, Wallet, Compass } from 'lucide-react';

interface RoleSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoleSwitcherModal: React.FC<RoleSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { currentRole, setCurrentRole, navigateTo } = useApp();

  if (!isOpen) return null;

  const roles: {
    role: UserRole;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    targetRoute: string;
  }[] = [
    {
      role: 'CUSTOMER',
      title: 'Customer workspace',
      subtitle: 'Preview saved selections and enquiry history when connected.',
      icon: <Eye className="w-5 h-5 text-[#B89B62]" />,
      targetRoute: '/account',
    },
    {
      role: 'ARTIST',
      title: 'Artist workspace',
      subtitle: 'Preview artist submissions and portfolio tools.',
      icon: <Palette className="w-5 h-5 text-[#B89B62]" />,
      targetRoute: '/artist-portal',
    },
    {
      role: 'ART_CURATOR',
      title: 'Curator workspace',
      subtitle: 'Preview catalogue and exhibition management tools.',
      icon: <Shield className="w-5 h-5 text-[#B89B62]" />,
      targetRoute: '/admin',
    },
    {
      role: 'ADMIN',
      title: 'Admin workspace',
      subtitle: 'Preview gallery administration tools.',
      icon: <Compass className="w-5 h-5 text-[#B89B62]" />,
      targetRoute: '/admin',
    },
    {
      role: 'FINANCE_MANAGER',
      title: 'Finance workspace',
      subtitle: 'Payment and settlement tools are unavailable until a provider is connected.',
      icon: <Wallet className="w-5 h-5 text-[#B89B62]" />,
      targetRoute: '/admin',
    },
    {
      role: 'VISITOR',
      title: 'Public visitor',
      subtitle: 'Public visitor exploring collections, exhibitions, and educational art journal articles.',
      icon: <Eye className="w-5 h-5 text-[#817C73]" />,
      targetRoute: '/gallery',
    },
  ];

  const handleSelect = (r: (typeof roles)[0]) => {
    setCurrentRole(r.role);
    navigateTo(r.targetRoute);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#F7F5F0] border border-[#817C73]/30 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-[#817C73] hover:text-[#171717] transition-colors"
          aria-label="Close role switcher"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest text-[#817C73] font-sans block mb-1">
            Workspace Preview
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#171717]">
            Select Platform Persona
          </h2>
          <p className="text-xs text-[#817C73] mt-1">
            Preview different workspace layouts. This does not sign you in or grant secure access.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {roles.map(r => {
            const isSelected = currentRole === r.role;
            return (
              <button
                key={r.role}
                onClick={() => handleSelect(r)}
                className={`text-left p-4 border transition-all ${
                  isSelected
                    ? 'border-[#B89B62] bg-[#B89B62]/10 shadow-sm'
                    : 'border-[#817C73]/20 bg-white hover:border-[#171717]'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-1.5 bg-[#F7F5F0] border border-[#817C73]/20">
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#171717] leading-tight">
                      {r.title}
                    </h3>
                    {isSelected && (
                      <span className="text-[10px] text-[#B89B62] font-semibold uppercase tracking-wider block">
                        Active Perspective
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-[#817C73] leading-relaxed">
                  {r.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-[#817C73]/20 flex justify-between items-center text-xs text-[#817C73]">
          <span>Local interface preview only · Secure sign-in is not configured</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#171717] text-[#F7F5F0] text-xs font-medium hover:bg-[#171717]/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
