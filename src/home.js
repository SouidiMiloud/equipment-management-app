import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './Navbar';
import HeroComponent from './herocomponent';

document.querySelectorAll('.story-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('change')
        btn.nextElementSibling.classList.toggle('change')
    })
})
function HomeComponent(){
    return ( 
        
        
        <section className="section-1">

                
            <div className="container">
                    <Navbar />  
            </div>    
            
                                  
                {/* <section class="section-1" id="home">  */}
                        
                    <div class="floating-bg">
                    
                    </div>
                
                <HeroComponent />
                        {/* <h1 class="section-1-heading"></h1> */}
                    
                
                            
                    
                 {/* </section>  */}
                                    

            
                
                
            </section>           
                                    
            
        
        )
}
export default HomeComponent;