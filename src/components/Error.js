import React from "react";

const Error = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="alert alert-danger" role="alert">
        Veriler Çekilirken Beklenmedik Bir Hata Oluştu. Lütfen Daha Sonra Tekrar Deneyiniz.
      </div>
    </div>
  );
};

export default Error