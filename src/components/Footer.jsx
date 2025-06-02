import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <div className="flex flex-col mb-4  ">
      <div className="grid grid-cols-1  md:grid-cols-2 gap-4 ">
        <div className="flex flex-col border p-5 mx-3">
          <h2>Follow Us</h2>
          <div className="flex flex-col items-center ">          
            <div className="flex gap-4 text-foreground ">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" "
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-gray-800 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
               
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border text-foreground p-5 mx-3">
         <h2>Get the Movies App</h2>
        </div>
      </div> 
    </div>
  );
};

export default Footer;
