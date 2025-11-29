
import { ChevronRight } from 'lucide-react';
import MenuItem from '../models/interfaces/MenuItem';

function ButonMenuItem({index, item}: {index: number, item: MenuItem}) {
    return (
        <button 
              key={index} 
              className="menu-item"
              onClick={item.action}
            >
              <div className="menu-item-left">
                <div className={`menu-icon menu-icon-${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="menu-title">{item.title}</span>
              </div>
              <div className="menu-item-right">
                {item.badge && (
                  <span className="menu-badge">{item.badge}</span>
                )}
                <ChevronRight className="menu-arrow" />
              </div>
            </button>
    )
};
export default ButonMenuItem;