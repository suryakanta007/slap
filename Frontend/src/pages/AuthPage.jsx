import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import "../styles/auth.css"

const AuthPage = () => {
    return (
        <div className='auth-container'>
            <div className='auth-left'>
                <div className="auth-hero">
                    <div className="brand-container">
                        <img src="/logo.png" alt="slap" className="brand-logo" />
                        <span className='brand-name'>Slap</span>
                    </div>

                    <h1 className='hero-title'>
                        Where Work Happnes ✨
                    </h1>

                    <p className='hero-subtitle'>
                        Connect with your team instantly through secure, real-time messaging.Experience seamless collaboration with powerful features designed for modren teams.
                    </p>

                    <div className='features-list'>
                        <div className='feature-item'>
                            <span className="feature-icon">💬</span>
                            <span>Real-time Messaging</span>
                        </div>
                        <div className='feature-item'>
                            <span className="feature-icon">🎥</span>
                            <span>Video calls & meetings</span>
                        </div>
                        <div className='feature-item'>
                            <span className="feature-icon">🔒</span>
                            <span>Real-time Messaging</span>
                        </div>

                        <SignInButton  mode="modal">
                            <button className="cta-button">
                                Get Started with Slap
                                <span className="button-arrow">→</span>
                            </button>
                        </SignInButton>

                    </div>
                </div>
            </div>

            <div className="auth-right">
                <div className="auth-image-container">
                    <img src="/auth-i.png" alt="Team collaboration" className="auth-image" />
                    <div className="image-overlay"></div>
                </div>
            </div>

        </div>
    )
}

export default AuthPage