function Component(object: { title: string }) {
  return (
    <h1 className="p-3 bg-slate-600 text-white rounded-xl">{object.title}</h1>
  );
}

export default Component;
