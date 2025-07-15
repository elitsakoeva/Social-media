import type { FC } from "react";
import "../components/authentication-form/AuthenticationForm.css";

interface IHomePageProps {}

export const HomePage: FC<IHomePageProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "var(--primary-blue)",
        textShadow: "0 0 6rem var(--primary-blue)",
        gap: "10rem",
      }}
    >
      <h1>Welcome to Social Media</h1>
    </div>
  );
};
