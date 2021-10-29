import React from 'react'

const Loading = () => {
    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            zIndex: 2000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white"
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 94.73 95.377">
                <path id="path" data-name="Caminho 1" d="M217.33,407.052v18.642s7.532-8.6,17.462-9.439,25.875,13.7,24.777,34.216-24.845,46.987-38.463,46.958-25.13-16.083-30.912-14.158-4.247,12.742-4.247,12.742H169.9V483.271c0-6.038,4.5-13.214,12.978-13.214h18.878c14.049,0,11.121-17.28,11.327-25.013s-10.147-9.815-10.147-19.35V407.052Z" transform="translate(-167.4 -404.552)" fill="#ff7272" stroke="#000" strokeWidth="5"/>
            </svg>

        </div>
    )
}

export default Loading
