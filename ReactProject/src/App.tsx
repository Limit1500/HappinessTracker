import { useEffect, useState } from "react";
import Component from "./Component";

interface element {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [elements, setElements] = useState<element[]>([]);
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const result = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!result.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonResult: element[] = await result.json();
        setElements(jsonResult);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Is loading...</p>;
  if (error != null) return <p>An error occured: {error}</p>;

  return (
    <>
      <button
        className={`p-4 ${
          hidden ? "bg-red-600" : "bg-green-600"
        } rounded-xl font-bold text-white m-8`}
        onClick={() => {
          setHidden(!hidden);
        }}
      >
        {hidden ? "unhide" : "hide"}
      </button>
      <div className="flex gap-2 flex-col w-[500px]">
        {hidden ? (
          elements.map((element, index) => {
            return <Component key={index} title={element.title} />;
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
