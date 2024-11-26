export default function Footer() {
  return (
      <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
              {/* Top Section */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  {/* Logo and Description */}
                  <div className="text-center md:text-left">
                      <h3 className="text-lg font-semibold">Feiras de Comércio Justo</h3>
                      <p className="text-gray-400 mt-2">
                          Conectando você com produtores locais e promovendo um comércio mais justo.
                      </p>
                  </div>
                  {/* Navigation Links */}
                  <div className="mt-4 md:mt-0 flex space-x-6">
                      <a href="#" className="text-gray-400 hover:text-white">
                          Sobre Nós
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                          Feiras
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white">
                          Contato
                      </a>
                  </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex justify-center md:justify-end space-x-4 mb-6">
                  <a
                      href="https://www.facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                  >
                      <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                      href="https://www.twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                  >
                      <i className="fab fa-twitter"></i>
                  </a>
                  <a
                      href="https://www.instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white"
                  >
                      <i className="fab fa-instagram"></i>
                  </a>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 pt-4 text-center">
                  <p className="text-gray-400 text-sm">
                      &copy; 2024 Feiras de Comércio Justo. Todos os direitos reservados.
                  </p>
              </div>
          </div>
      </footer>
  );
}
