import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/BreadcrumbNav.css';

const BreadcrumbNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const steps = [
        { label: 'Cart', path: '/cart' },
        { label: 'Details', path: '/checkout/shipping-info' },
        { label: 'Shipping', path: '/checkout/shipping-method' },
        { label: 'Payment', path: '/checkout/payment' }
    ];

    // Find the current step index
    const currentStepIndex = steps.findIndex(step => currentPath === step.path);

    return (
        <div className="breadcrumb-nav">
            {steps.map((step, index) => {
                const isActive = currentPath === step.path;
                const isPast = index < currentStepIndex;
                const isFuture = index > currentStepIndex;

                if (isPast || isActive) {
                    return (
                        <React.Fragment key={step.path}>
                            {index > 0 && <span className="separator">›</span>}
                            <Link
                                to={step.path}
                                className={`breadcrumb-link ${isActive ? 'active' : ''}`}
                            >
                                {step.label}
                            </Link>
                        </React.Fragment>
                    );
                } else {
                    return (
                        <React.Fragment key={step.path}>
                            {index > 0 && <span className="separator">›</span>}
                            <span className="disabled">{step.label}</span>
                        </React.Fragment>
                    );
                }
            })}
        </div>
    );
};

export default BreadcrumbNav; 