import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import '../styles/mobile-navbar.scss'

const MobileNavbar = ({ reports, onLogout, onDeleteReport }) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleNavigateReport = (reportId) => {
        navigate(`/interview/${reportId}`)
        setIsOpen(false)
    }

    const handleDeleteReport = (e, reportId) => {
        e.stopPropagation()
        if (confirm('Are you sure you want to delete this interview plan? This action cannot be undone.')) {
            if (onDeleteReport) {
                onDeleteReport(reportId)
                .catch(() => {
                    alert('Failed to delete report. Please try again.')
                })
            }
        }
    }

    const handleLogout = async () => {
        await onLogout()
        navigate('/login')
        setIsOpen(false)
    }

    return (
        <>
            <nav className='mobile-navbar'>
                <button 
                    className={`mobile-navbar__toggle ${isOpen ? 'mobile-navbar__toggle--active' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {isOpen && (
                <>
                    <div className='mobile-navbar__overlay' onClick={() => setIsOpen(false)} />
                    <div className='mobile-navbar__menu'>
                        <div className='mobile-navbar__header'>
                            <h2>Menu</h2>
                            <button 
                                className='mobile-navbar__close'
                                onClick={() => setIsOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className='mobile-navbar__content'>
                            {reports.length > 0 && (
                                <div className='mobile-navbar__section'>
                                    <h3 className='mobile-navbar__section-title'>Recent Reports</h3>
                                    <ul className='mobile-navbar__reports'>
                                        {reports.map(report => (
                                            <li key={report._id}>
                                                <div className='mobile-navbar__report-item'>
                                                    <button 
                                                        className='mobile-navbar__report-btn'
                                                        onClick={() => handleNavigateReport(report._id)}
                                                    >
                                                        <span className='mobile-navbar__report-title'>
                                                            {report.title || 'Untitled Position'}
                                                        </span>
                                                        <span className={`mobile-navbar__score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                                            {report.matchScore}%
                                                        </span>
                                                    </button>
                                                    <button 
                                                        className='mobile-navbar__report-delete'
                                                        onClick={(e) => handleDeleteReport(e, report._id)}
                                                        title='Delete this report'
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className='mobile-navbar__section'>
                                <button 
                                    className='mobile-navbar__logout'
                                    onClick={handleLogout}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MobileNavbar
