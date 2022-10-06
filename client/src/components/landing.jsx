import { Link } from 'react-router-dom';
import '../css/landing.css'
import popcorn from '../assets/popcorn.png'
import avocado from '../assets/avocado.png'
import bread from '../assets/bread.png'
import coffee from '../assets/coffee.png'
import coke from '../assets/coke.png'
import hamburger from '../assets/hamburger.png'
import pancakes from '../assets/pancakes.png'
import pie from '../assets/pie.png'
import shopping from '../assets/shopping.png'
import teacup from '../assets/teacup.png'
import next from '../assets/next.png'

export default function Landing() {
    return <div>
        <div className='text'>
            <h1>Welcome, foodie</h1>
            <Link to='./recipes' className='cta'>
                <p>Let's cook</p>
                <img src={next} alt="next icon" />
            </Link>
        </div>

        <div className="area" >
            <ul className="circles">
                    <img src={popcorn} alt='popcorn'></img>
                    <img src={coke} alt='popcorn'></img>
                    <img src={bread} alt='popcorn'></img>
                    <img src={coffee} alt='popcorn'></img>
                    <img src={teacup} alt='popcorn'></img>
                    <img src={hamburger} alt='popcorn'></img>
                    <img src={shopping} alt='popcorn'></img>
                    <img src={pie} alt='popcorn'></img>
                    <img src={pancakes} alt='popcorn'></img>
                    <img src={avocado} alt='popcorn'></img>
            </ul>
    </div >
    </div>
}