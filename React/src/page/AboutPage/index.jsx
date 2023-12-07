import { memo } from "react"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import "./About_Page.css";
import AboutImage from "../../images/fruitbasket.png";

const AboutPage = memo(() => {
    return (
        <div className="pre-content">
            <Header />
            <div className="container">
                <div>
                    <h1 class="aboutheader">About Us</h1>
                </div>
                <div>
                    <img src={AboutImage} alt="AboutImage" class="aboutimage" />
                    
                </div>

                <p class="aboutdescription">At Grocery Co. we're on a mission to revolutionize the way you shop for groceries.
                    We understand that your time is precious, and we're here to make your life easier by bringing the grocery store to your doorstep.📦 </p>
                <h2 class="whoheader">Who We Are</h2>
                <p class="whodescription">Our journey began with a simple idea 💡 - to simplify the grocery shopping experience for busy individuals
                    and families. We were tired of long lines, crowded aisles, and the hassle of juggling bags of groceries. That's why we decided to
                    create an online grocery store that combines the convenience of online shopping with the freshness and quality you expect from your
                    neighborhood supermarket 🥦</p>
                <h2 class="joinheader">Join Us On Our Journey</h2>
                <p class="joindescription">We're excited to have you as part of the Grocery Co. community. Whether you're a busy professional, a parent on the go,
                    or simply someone who values convenience, we're here to make your life easier and your meals more delicious.🥞</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3092220932904!2d-121.88365178806669!3d37.33518737198309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fccb864de43d5%3A0x397ffe721937340e!2sSan%20Jos%C3%A9%20State%20University!5e0!3m2!1sen!2sus!4v1701845959287!5m2!1sen!2sus" width="600" height="300" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                
            </div>
            <Footer />
        </div>
    )
})
export default AboutPage