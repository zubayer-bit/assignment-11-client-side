import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-base-200 text-base-content mt-15"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-primary">AssetVerse</h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              A smart corporate asset management system to track, assign,
              and manage company-owned assets efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-title text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="link link-hover text-secondary hover:text-primary transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="link link-hover text-secondary hover:text-primary transition-colors duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register-employee"
                  className="link link-hover text-secondary hover:text-primary transition-colors duration-300"
                >
                  Join as Employee
                </Link>
              </li>
              <li>
                <Link
                  to="/register-hr"
                  className="link link-hover text-secondary hover:text-primary transition-colors duration-300"
                >
                  Join as HR
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="footer-title text-primary">Contact</h3>
            <p className="text-sm text-secondary">Email: support@assetverse.com</p>
            <p className="text-sm text-secondary mt-1">Phone: +880 1234-567890</p>
          </div>

          {/* Social */}
          <div>
            <h3 className="footer-title text-primary">Follow Us</h3>
            <div className="flex gap-4 mt-4">
              {[FaFacebookF, FaLinkedinIn, FaGithub, FaXTwitter].map(
                (Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-circle btn-outline border-secondary text-secondary hover:bg-primary hover:text-white transition-colors duration-300"
                  >
                    <Icon className="text-current" />
                  </motion.a>
                )
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300 py-4 text-center text-sm text-secondary">
        © {new Date().getFullYear()} AssetVerse. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
