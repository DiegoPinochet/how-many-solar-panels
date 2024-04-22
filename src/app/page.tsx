import { Input } from "@ui";
import { PlacedRectangles } from "./_components/placed-rectangles";

const Home = () => {
  return (
    <div className="flex flex-row justify-center py-12 px-6">
      <div className="bg-white flex flex-col gap-8 bg-background rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center">
          How many solar panels can fit in container?
        </h2>
        <div className="flex flex-row justify-center h-full">
          <PlacedRectangles />
        </div>
      </div>
    </div>
  );
};

export default Home;
