import React from 'react';
import {Link} from 'react-router-dom';

const Hour = () => {
   return (
      <div className='component'>
         <div className="left">
            <div >
               <input className='search' type="text" placeholder='search'/>

              <p><img className='icon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMYTNaisA0GJu7VNW8xK_pX3r7r46wo__ihA&usqp=CAU" alt="" /></p>
            </div>
           
               <div className="weather">
                  <p className='boll'>Hà Nội</p>
                  <p className='boll'>30°C</p>
                  <p>Monday, 11h59 PM</p>
                  <p>Overcast  Clouds</p>
                  <p>Clouds 100%</p>

                  <img className='IMG' src="http://media.dulich24.com.vn/diemden/ha-noi-9/ddffeb6a-ea3b-480b-acb8-a0394fba6599-2.JPG" alt="" />
               </div>
         </div>
      <div className="right">
      <nav>
        <ul>
          <li>
            <Link to="/Today">Today</Link>
          </li> 

          <li>
            <Link to="/Week">Week</Link>
          </li>

          <li>
            <Link to="/Hour">Hour</Link>
          </li>
        </ul>
      </nav>

         </div>
      </div>
   );
};

export default Hour;