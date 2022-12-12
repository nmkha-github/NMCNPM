import React from 'react';

export default function Header()
{
    return (
    <nav className="nav">
        <a href="/" className="site-title">Logo</a>
        <ul>
            <li>
                <a href="/resource">Resource</a>
            </li>
            <li>  
                <a href="/room">Room</a>
            </li>
            <li>   
                <a href="/schedule">Schedule</a>
            </li>
        </ul>
        <button>
            Nhan vien
        </button>

    </nav>
    )
}