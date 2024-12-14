import pageNotFoundLogo from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <img
        className="h-44 lg:h-52"
        src={pageNotFoundLogo}
        alt="PageNotFound_Logo"
      />
      <p className="text-xl text-gray-700 mb-2">Page not found</p>
      <p className="text-xl text-gray-600">or you don't have permission.</p>
    </div>
  );
};

export default NotFound;
