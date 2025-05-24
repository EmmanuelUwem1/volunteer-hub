
export default function Footer() {
  return (
    <footer className="w-full py-6 bg-white border-t border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} VolunteerHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}