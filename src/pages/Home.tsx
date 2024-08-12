import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main>
      <div className="p-24 flex items-center justify-center h-screen">
        <TaskList />
      </div>
    </main>
  );
}
