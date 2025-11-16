import { useCallback, useEffect, useState } from "react";
import { fetchAllProducts as fetchAllProductsAPI, updateProduct } from "../../api/products.js";
import { ToggleLanguage } from "../../components/toggle-language.jsx";
import { useAuth } from "../../hooks/use-auth.jsx";
import { useLanguage } from "../../hooks/use-language.jsx";
import "./home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const { t } = useLanguage();

  const [saving, setSaving] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await fetchAllProductsAPI();
      if (response.error) {
        console.error("Error fetching products", response.data);
        setProducts([]);
        return;
      }
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleCellEdit = useCallback(
    debounce(async (productId, field, value) => {
      setSaving(productId);
      try {
        const product = products.find((p) => p.id === productId);
        const updatedProduct = { ...product, [field]: value };
        await updateProduct(productId, { [field]: value });

        setProducts((prev) => prev.map((p) => (p.id === productId ? updatedProduct : p)));
      } catch (error) {
        console.error("Failed to update product:", error);
      } finally {
        setTimeout(() => setSaving(null), 500);
      }
    }, 800),
    [products]
  );

  return (
    <div className="pricelist-container">
      <header className="pricelist-header">
        <div className="header-left">
          <button className="menu-button">☰</button>
          <div className="user-info">
            <div className="user-avatar">
              <span>{user?.fullName?.[0] || "U"}</span>
            </div>
            <div className="user-details">
              <div className="user-name">{user?.fullName}</div>
              <div className="user-company">Storfjord AS</div>
            </div>
          </div>
        </div>

        <div className="header-right">
          <ToggleLanguage />
        </div>
      </header>

      <div className="pricelist-content">
        <div className="pricelist-content-inner">
          <div className="search-section">
            <div className="search-input-wrapper">
              <input type="text" placeholder={t("pricelist.search_article")} className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
            <div className="search-input-wrapper">
              <input type="text" placeholder={t("pricelist.search_product")} className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="action-buttons">
            <button className="action-btn">
              <span className="btn-text">{t("pricelist.new_product")}</span>
              <span className="btn-icon">+</span>
            </button>
            <button className="action-btn ">
              <span className="btn-text">{t("pricelist.print_list")}</span>
              <span className="btn-icon">🖨</span>
            </button>
            <button className="action-btn ">
              <span className="btn-text">{t("pricelist.advanced_mode")}</span>
              <span className="btn-icon">⚙</span>
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="products-table">
            <thead>
              <tr>
                <th className="col-article">{t("pricelist.article_no")}</th>
                <th className="col-product">{t("pricelist.product_service")}</th>
                <th className="col-in-price">{t("pricelist.in_price")}</th>
                <th className="col-price">{t("pricelist.price")}</th>
                <th className="col-unit">{t("pricelist.unit")}</th>
                <th className="col-stock">{t("pricelist.in_stock")}</th>
                <th className="col-description">{t("pricelist.description")}</th>
                <th className="col-actions"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className={saving === product.id ? "saving" : ""}>
                  <td className="col-article">
                    <input
                      type="text"
                      defaultValue={product.articleNo || ""}
                      onChange={(e) => handleCellEdit(product.id, "articleNo", e.target.value)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-product">
                    <input
                      type="text"
                      defaultValue={product.productService || ""}
                      onChange={(e) => handleCellEdit(product.id, "productService", e.target.value)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-in-price">
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={product.inPrice || ""}
                      onChange={(e) => handleCellEdit(product.id, "inPrice", parseFloat(e.target.value) || 0)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-price">
                    <input
                      type="number"
                      step="0.01"
                      defaultValue={product.price || ""}
                      onChange={(e) => handleCellEdit(product.id, "price", parseFloat(e.target.value) || 0)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-unit">
                    <input
                      type="text"
                      defaultValue={product.unit || ""}
                      onChange={(e) => handleCellEdit(product.id, "unit", e.target.value)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-stock">
                    <input
                      type="number"
                      defaultValue={product.inStock || ""}
                      onChange={(e) => handleCellEdit(product.id, "inStock", parseInt(e.target.value) || 0)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-description">
                    <input
                      type="text"
                      defaultValue={product.description || ""}
                      onChange={(e) => handleCellEdit(product.id, "description", e.target.value)}
                      className="editable-cell"
                    />
                  </td>
                  <td className="col-actions">
                    <button className="more-btn">⋯</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {saving && <div className="save-indicator">{t("pricelist.saving")}</div>}
      </div>
    </div>
  );
};

export default Home;
