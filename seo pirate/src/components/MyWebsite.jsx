import React from "react";
import "./mywebsite.css";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useState, useEffect } from "react";
import SEOData from "./SEOData";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function MyWebsites() {
  const { user, logOutUser } = useContext(AuthContext);
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const [editWebsite, setEditWebsite] = useState({
    id: null,
    name: "",
    url: "",
  });
  let { websiteId } = useParams();

  const [websites, setWebsites] = useState([]);
  const [showH1, setShowH1] = useState(false);
  const editWebsiteSelectRef = useRef();

  const [forceRender, setForceRender] = useState(false);

  const handleH1Click = () => {
    setShowH1(!showH1);
    setForceRender(!forceRender);
    console.log("showH1 is", !showH1);
  };

  const handleNewWebsiteChange = (event) => {
    setNewWebsite({ ...newWebsite, [event.target.name]: event.target.value });
  };

  const handleEditWebsiteChange = (event) => {
    setEditWebsite({ ...editWebsite, [event.target.name]: event.target.value });
  };

  const handleNewWebsiteSubmit = async (event) => {
    event.preventDefault();
    try {
      const websiteData = { ...newWebsite, userId: user._id };
      const response = await axios.post(
        `${API_URL}/api/websites`,
        websiteData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      window.alert("Site ajouté avec succès !");

      // Set the new website as the only element in the websites array
      setWebsites([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWebsites = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/websites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (websiteId) {
        // Si un ID de site web est fourni, recherchez ce site spécifique dans la réponse
        const website = response.data.find(
          (website) => website._id === websiteId
        );
        setWebsites([website]); // Afficher uniquement ce site Web
      } else {
        // Sinon, affichez tous les sites Web comme avant
        setWebsites(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Load websites when the component is mounted
  useEffect(() => {
    loadWebsites();
  }, []);

  const handleEditWebsiteSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/websites/${editWebsite.id}`,
        editWebsite,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      window.alert("Site modifié avec succès !"); // Ajoutez cette ligne
      loadWebsites(); // Rechargez les sites web après une modification réussie
    } catch (error) {
      console.error(error);
      window.alert("Une erreur est survenue lors de la modification du site."); // Vous pouvez également ajouter une alerte d'erreur
    }
  };

  const handleWebsiteToEditSelectChange = async (event) => {
    const websiteId = event.target.value;
    try {
      // Requête pour obtenir les détails du site Web à modifier
      const response = await axios.get(`${API_URL}/api/websites/${websiteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // Mettre à jour l'état avec les détails du site Web
      setEditWebsite({
        id: websiteId,
        name: response.data.name,
        url: response.data.url,
      });
      setSelectedWebsite(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="MyWebsite">
      <img className="logoContainer" src={logo} alt="logo" />
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/my-website">My Website</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={logOutUser}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
      <div className="transparentcontainer">
        <div className="topContainer1">
          {" "}
          <h2>Add a new website</h2>
          <span>
            <label>Website URL:</label>
            <input
              type="text"
              placeholder="Enter website URL"
              name="url"
              value={newWebsite.url}
              onChange={handleNewWebsiteChange}
            />
          </span>
          <span>
            <label>Website Name:</label>
            <input
              type="text"
              placeholder="Enter website name"
              name="name"
              value={newWebsite.name}
              onChange={handleNewWebsiteChange}
            />
          </span>
          <button onClick={handleNewWebsiteSubmit}>Add</button>
        </div>
        <div className="topContainer2">
          <h2 style={{ display: "flex", alignItems: "center" }}>
            Select or Modify a website
            <span
              onClick={loadWebsites}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            >
              🔄
            </span>
          </h2>

          <span>
            <label>select website :</label>
            <select
              ref={editWebsiteSelectRef}
              onChange={handleWebsiteToEditSelectChange}
            >
              <option value="">Select a website</option>
              {websites.map((website) => (
                <option key={website._id} value={website._id}>
                  {website.name}
                </option>
              ))}
            </select>
          </span>

          <span>
            <label>Website URL:</label>
            <input
              type="text"
              placeholder="Enter website URL"
              name="url"
              value={editWebsite.url}
              onChange={handleEditWebsiteChange}
            />
          </span>

          <span>
            <label>Website Name:</label>
            <input
              type="text"
              placeholder="Enter website name"
              name="name"
              value={editWebsite.name}
              onChange={handleEditWebsiteChange}
            />
          </span>

          <button onClick={handleEditWebsiteSubmit}>Modify</button>
        </div>
        <div className="bottomContainer">
          <h2>My Website Details🏴‍☠️</h2>

          {selectedWebsite ? (
            <div className="scrollable-container">
              <h3>{selectedWebsite.name}☠️</h3>
              <p>
                <a
                  href={selectedWebsite.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "blue" }}
                >
                  {selectedWebsite.url}
                  🔗
                </a>
              </p>
              <h4>SEO Data🔍</h4>
              <SEOData seoData={selectedWebsite.seodatas} />
            </div>
          ) : (
            <p>No website selected yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWebsites;
