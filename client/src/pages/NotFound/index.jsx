import { Navigate, Link, NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <>
      <div className="flex content-center justify-center">
        <h2 className="pb-3">Strona nie znaleziona!</h2> <br />
        <p>
          Wróć do{" "}
          <Link
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            to="/"
          >
            &#9166; Strona startowa
          </Link>
        </p>
      </div>
    </>
  );
};
export default NotFound;
