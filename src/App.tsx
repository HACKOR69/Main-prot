import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  User,
  MessageSquare,
  Download,
  ArrowRight,
  Code,
  Palette,
  Database,
  Smartphone,
  Globe,
} from "lucide-react";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Refs for section tracking
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  // Check if sections are in view for active nav highlighting
  const isHomeInView = useInView(homeRef, { margin: "-50% 0px -50% 0px" });
  const isAboutInView = useInView(aboutRef, { margin: "-50% 0px -50% 0px" });
  const isProjectsInView = useInView(projectsRef, {
    margin: "-50% 0px -50% 0px",
  });
  const isSkillsInView = useInView(skillsRef, { margin: "-50% 0px -50% 0px" });
  const isContactInView = useInView(contactRef, {
    margin: "-50% 0px -50% 0px",
  });

  // Update active section based on scroll position
  if (isHomeInView && activeSection !== "home") setActiveSection("home");
  if (isAboutInView && activeSection !== "about") setActiveSection("about");
  if (isProjectsInView && activeSection !== "projects")
    setActiveSection("projects");
  if (isSkillsInView && activeSection !== "skills") setActiveSection("skills");
  if (isContactInView && activeSection !== "contact")
    setActiveSection("contact");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Form submission logic would go here
      console.log("Form submitted:", formData);
      alert("Thank you for your message! I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans text-white bg-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text"
            >
              Portfolio
            </motion.div>

            <div className="hidden space-x-8 md:flex">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        item === "home"
                          ? homeRef
                          : item === "about"
                          ? aboutRef
                          : item === "projects"
                          ? projectsRef
                          : item === "skills"
                          ? skillsRef
                          : contactRef
                      )
                    }
                    className={`capitalize transition-all duration-300 ${
                      activeSection === item
                        ? "text-blue-400 font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button className="text-gray-400 md:hidden">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={homeRef}
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="container relative z-10 px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl font-bold md:text-7xl">
              Hi, I'm{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
                Yousef hany
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-300 md:text-2xl">
              Frontend Developer
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center px-8 py-4 mx-auto space-x-2 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
              onClick={() => scrollToSection(projectsRef)}
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        <div className="absolute transform -translate-x-1/2 bottom-10 left-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-800">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid items-center gap-12 md:grid-cols-2"
          >
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
              <p className="mb-6 leading-relaxed text-gray-300">
                I'm a passionate frontend developer with over 1 year of
                experience creating beautiful and functional web applications. I
                specialize in JavaScript , Tailwincss, and modern CSS frameworks
                while maintaining a strong focus on user experience and
                performance.
              </p>
              <p className="mb-8 leading-relaxed text-gray-300">
                When I'm not coding, you can find me exploring new design
                trends, contributing to open source projects, or hiking in the
                mountains to clear my mind and find inspiration.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 font-semibold text-blue-400"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button>
            </div>

            <div className="relative">
              <div className="p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                <div className="p-2 bg-gray-900 rounded-2xl">
                  <img
                    src="./images/WhatsApp Image 2025-09-15 at 11.45.08 AM.jpeg"
                    alt="Portrait of Yousef Hany, a professional frontend developer with a friendly smile"
                    className="w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
              <div className="absolute w-24 h-24 -bottom-5 -right-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl -z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-gray-900">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Featured Projects
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Here are some of my recent projects that showcase my skills and
              expertise
            </p>
          </motion.div>

          <div className="grid gap-20 ml-20 md:grid-cols-2 lg:grid-cols-2">
            {/* Project 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-gray-800 cursor-pointer rounded-2xl group"
              onClick={() => window.open("/main page.html")}
            >
              <div className="overflow-hidden">
                <img
                  src="/images/sbs logo.png"
                  alt="E-commerce dashboard interface with analytics charts and product statistics"
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-104"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Synchronized Business Solutions (SBS)
                </h3>
                <p className="mb-4 text-gray-400">Creative Digital Company for LED & LCD Screens.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-500/20">
                    Html
                  </span>
                  <span className="px-3 py-1 text-sm text-purple-400 rounded-full bg-purple-500/20">
                    JavaScript
                  </span>
                  <span className="px-3 py-1 text-sm text-green-400 rounded-full bg-green-500/20">
                    Tailwindcss
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            {/* <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-gray-800 cursor-pointer rounded-2xl group"
            >
              <div className="overflow-hidden">
                <img
                  src="https://placehold.co/600x400"
                  alt="Fitness tracking mobile application with workout statistics and progress charts"
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Fitness Tracker App
                </h3>
                <p className="mb-4 text-gray-400">
                  Mobile application for tracking workouts, nutrition, and
                  fitness progress.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-500/20">
                    React Native
                  </span>
                  <span className="px-3 py-1 text-sm text-red-400 rounded-full bg-red-500/20">
                    Firebase
                  </span>
                  <span className="px-3 py-1 text-sm text-yellow-400 rounded-full bg-yellow-500/20">
                    JavaScript
                  </span>
                </div>
              </div>
            </motion.div>  */}

            {/* Project 3 */}
            {/* <motion.div
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-gray-800 cursor-pointer rounded-2xl group"
            >
              <div className="overflow-hidden">
                <img
                  src="https://placehold.co/600x400"
                  alt="Real estate website with property listings, search filters, and virtual tour features"
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">
                  Real Estate Platform
                </h3>
                <p className="mb-4 text-gray-400">
                  Modern real estate website with property search, virtual
                  tours, and agent connections.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm text-blue-400 rounded-full bg-blue-500/20">
                    Next.js
                  </span>
                  <span className="px-3 py-1 text-sm text-green-400 rounded-full bg-green-500/20">
                    GraphQL
                  </span>
                  <span className="px-3 py-1 text-sm text-purple-400 rounded-full bg-purple-500/20">
                    Chakra UI
                  </span>
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 bg-gray-800">
        <div className="container px-6 mx-auto ">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Skills & Expertise
            </h2>
            <p className="max-w-2xl mx-auto text-gray-400">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-20 md:grid-cols-2 ">
            {/* Skill 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl">
                <Code className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold">Frontend</h3>
              <p className="text-sm text-gray-400">React, Tailwindcss</p>
            </motion.div>

            {/* Skill 2 */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-2xl">
                <Palette className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="mb-2 font-semibold">UI/UX Design</h3>
              <p className="text-sm text-gray-400">Figma, Adobe XD</p>
            </motion.div> */}

            {/* Skill 3 */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl">
                <Database className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="mb-2 font-semibold">Backend</h3>
              <p className="text-sm text-gray-400">Node.js, Express</p>
            </motion.div> */}

            {/* Skill 4 */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-500/20 rounded-2xl">
                <Smartphone className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="mb-2 font-semibold">Mobile</h3>
              <p className="text-sm text-gray-400">React Native, Flutter</p>
            </motion.div> */}

            {/* Skill 5 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-2xl">
                <Globe className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="mb-2 font-semibold">Web</h3>
              <p className="text-sm text-gray-400">HTML, CSS, JavaScript</p>
            </motion.div>

            {/* Skill 6 */}
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border border-gray-700 bg-gray-900/50 backdrop-blur-md rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-pink-500/20 rounded-2xl">
                <svg
                  className="w-8 h-8 text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-semibold">DevOps</h3>
              <p className="text-sm text-gray-400">Docker, AWS, CI/CD</p>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-gray-900">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Get In Touch
              </h2>
              <p className="text-gray-400">
                Have a project in mind or want to collaborate? I'd love to hear
                from you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 border border-gray-700 bg-gray-800/50 backdrop-blur-md rounded-2xl"
            >
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="flex items-center block mb-2 text-gray-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-white transition-all border border-gray-600 rounded-lg bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="flex items-center block mb-2 text-gray-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-white transition-all border border-gray-600 rounded-lg bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label
                  htmlFor="message"
                  className="flex items-center block mb-2 text-gray-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 text-white transition-all border border-gray-600 rounded-lg bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell me about your project..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Yousef Hany. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
