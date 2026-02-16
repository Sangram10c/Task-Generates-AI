import React, { useState, useEffect, useCallback} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  ArrowLeft,
  Download,
  Trash2,
  FolderPlus,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import TaskItem from "./TaskItem";
import TaskGroup from "./TaskGroup";
import ExportModal from "./ExportModal";
import LoadingSpinner from "./LoadingSpinner";
import {
  getSpecification,
  updateSpecification,
  deleteSpecification,
} from "../services/api";

const TasksList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specification, setSpecification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  const fetchSpecification = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getSpecification(id);
      setSpecification(response.data);
    } catch (err) {
      setError("Failed to load specification");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchSpecification();
  }, [fetchSpecification]);

  const saveChanges = async (updatedData) => {
    try {
      await updateSpecification(id, updatedData);
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Don't do anything if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedTasks = Array.from(specification.tasks);

    // Find the task being moved
    const sourceGroupTasks = updatedTasks.filter(
      (task) =>
        task.groupId ===
        (source.droppableId === "ungrouped" ? null : source.droppableId),
    );
    const [movedTask] = sourceGroupTasks.splice(source.index, 1);

    // Update the task's groupId
    movedTask.groupId =
      destination.droppableId === "ungrouped" ? null : destination.droppableId;

    // Get destination group tasks
    const destinationGroupTasks = updatedTasks.filter(
      (task) => task.groupId === movedTask.groupId && task.id !== movedTask.id,
    );

    // Insert at new position
    destinationGroupTasks.splice(destination.index, 0, movedTask);

    // Rebuild the tasks array maintaining order
    const otherTasks = updatedTasks.filter(
      (task) => task.groupId !== movedTask.groupId && task.id !== movedTask.id,
    );

    const finalTasks = [...otherTasks, ...destinationGroupTasks].map(
      (task, index) => ({
        ...task,
        order: index,
      }),
    );

    const updatedSpec = { ...specification, tasks: finalTasks };
    setSpecification(updatedSpec);
    saveChanges({ tasks: finalTasks });
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = specification.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task,
    );
    const updatedSpec = { ...specification, tasks: updatedTasks };
    setSpecification(updatedSpec);
    saveChanges({ tasks: updatedTasks });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedTasks = specification.tasks.filter(
        (task) => task.id !== taskId,
      );
      const updatedSpec = { ...specification, tasks: updatedTasks };
      setSpecification(updatedSpec);
      saveChanges({ tasks: updatedTasks });
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup = {
      id: `group-${Date.now()}`,
      name: newGroupName,
      color: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
    };

    const updatedGroups = [...(specification.groups || []), newGroup];
    const updatedSpec = { ...specification, groups: updatedGroups };
    setSpecification(updatedSpec);
    saveChanges({ groups: updatedGroups });
    setNewGroupName("");
    setShowNewGroupForm(false);
  };

  const handleUpdateGroup = (updatedGroup) => {
    const updatedGroups = specification.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group,
    );
    const updatedSpec = { ...specification, groups: updatedGroups };
    setSpecification(updatedSpec);
    saveChanges({ groups: updatedGroups });
  };

  const handleDeleteGroup = (groupId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this group? Tasks will be moved to ungrouped.",
      )
    ) {
      const updatedTasks = specification.tasks.map((task) =>
        task.groupId === groupId ? { ...task, groupId: null } : task,
      );
      const updatedGroups = specification.groups.filter(
        (group) => group.id !== groupId,
      );
      const updatedSpec = {
        ...specification,
        tasks: updatedTasks,
        groups: updatedGroups,
      };
      setSpecification(updatedSpec);
      saveChanges({ tasks: updatedTasks, groups: updatedGroups });
    }
  };

  const handleUpdateRisks = (risks) => {
    const updatedSpec = { ...specification, risks };
    setSpecification(updatedSpec);
    saveChanges({ risks });
  };

  const handleUpdateUnknowns = (unknowns) => {
    const updatedSpec = { ...specification, unknowns };
    setSpecification(updatedSpec);
    saveChanges({ unknowns });
  };

  const handleDeleteSpecification = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this entire specification?",
      )
    ) {
      try {
        await deleteSpecification(id);
        navigate("/");
      } catch (err) {
        alert("Failed to delete specification");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size={48} text="Loading specification..." />
      </div>
    );
  }

  if (error || !specification) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md animate-scale-in">
          <div className="relative inline-block">
            <AlertCircle className="w-20 h-20 text-red-500" />
            <div className="absolute inset-0 bg-red-400 blur-3xl opacity-30"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
            <p className="text-slate-600">
              {error || "Specification not found"}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  const ungroupedTasks = specification.tasks.filter((task) => !task.groupId);
  const userStories = ungroupedTasks.filter((t) => t.type === "user_story");
  const engineeringTasks = ungroupedTasks.filter(
    (t) => t.type === "engineering_task",
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0 animate-slide-down">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="p-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold gradient-text">
                  Specification Details
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Edit, organize, and export your tasks
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExportModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/70 hover:bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="w-4 h-4 text-primary-600" />
                <span className="font-medium text-slate-700">Export</span>
              </button>
              <button
                onClick={handleDeleteSpecification}
                className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
                <span className="font-medium text-red-700">Delete</span>
              </button>
            </div>
          </div>

          {/* Feature Summary */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-slide-up card-hover">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-slate-800">
                Feature Idea
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SummaryItem
                label="Goal"
                value={specification.featureIdea.goal}
              />
              <SummaryItem
                label="Users"
                value={specification.featureIdea.users}
              />
              <SummaryItem
                label="Constraints"
                value={specification.featureIdea.constraints}
              />
              <SummaryItem
                label="Template"
                value={specification.featureIdea.template
                  .replace("_", " ")
                  .toUpperCase()}
              />
            </div>
          </div>

          {/* Risks and Unknowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <RiskCard
              title="🚨 Risks"
              value={specification.risks || ""}
              onChange={handleUpdateRisks}
              placeholder="Identify potential risks..."
            />
            <RiskCard
              title="❓ Unknowns"
              value={specification.unknowns || ""}
              onChange={handleUpdateUnknowns}
              placeholder="List open questions and unknowns..."
            />
          </div>

          {/* Task Groups */}
          {specification.groups && specification.groups.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                Task Groups
              </h2>
              {specification.groups.map((group) => (
                <TaskGroup
                  key={group.id}
                  group={group}
                  tasks={specification.tasks}
                  onUpdateGroup={handleUpdateGroup}
                  onDeleteGroup={handleDeleteGroup}
                  onUpdateTask={handleUpdateTask}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
            </div>
          )}

          {/* Create New Group */}
          <div className="mb-8">
            {showNewGroupForm ? (
              <div className="glass rounded-xl p-4 flex items-center space-x-3 animate-scale-in">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter group name..."
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  onKeyPress={(e) => e.key === "Enter" && handleCreateGroup()}
                  autoFocus
                />
                <button
                  onClick={handleCreateGroup}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowNewGroupForm(false);
                    setNewGroupName("");
                  }}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewGroupForm(true)}
                className="flex items-center space-x-2 px-4 py-2 glass hover:shadow-lg rounded-xl transition-all duration-200 card-hover"
              >
                <FolderPlus className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-slate-700">
                  Create Task Group
                </span>
              </button>
            )}
          </div>

          {/* User Stories Section */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-slide-up card-hover">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span className="gradient-text">User Stories</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                {userStories.length}
              </span>
            </h2>
            <Droppable droppableId="ungrouped-stories" type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[100px] rounded-xl p-3 transition-all duration-200 ${
                    snapshot.isDraggingOver
                      ? "bg-purple-50 ring-2 ring-purple-300"
                      : "bg-slate-50/50"
                  }`}
                >
                  {userStories.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-300 rounded-xl">
                      <p className="text-slate-500">No user stories yet</p>
                    </div>
                  ) : (
                    userStories.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskItem
                            task={task}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Engineering Tasks Section */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-8 animate-slide-up animate-delay-100 card-hover">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span className="gradient-text">Engineering Tasks</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                {engineeringTasks.length}
              </span>
            </h2>
            <Droppable droppableId="ungrouped-tasks" type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[100px] rounded-xl p-3 transition-all duration-200 ${
                    snapshot.isDraggingOver
                      ? "bg-cyan-50 ring-2 ring-cyan-300"
                      : "bg-slate-50/50"
                  }`}
                >
                  {engineeringTasks.length === 0 ? (
                    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-300 rounded-xl">
                      <p className="text-slate-500">No engineering tasks yet</p>
                    </div>
                  ) : (
                    engineeringTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <TaskItem
                            task={task}
                            onUpdate={handleUpdateTask}
                            onDelete={handleDeleteTask}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          {/* Export Modal */}
          {showExportModal && (
            <ExportModal
              specification={specification}
              onClose={() => setShowExportModal(false)}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

const SummaryItem = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <p className="text-slate-800 leading-relaxed">{value}</p>
  </div>
);

const RiskCard = ({ title, value, onChange, placeholder }) => (
  <div className="glass rounded-2xl p-6 card-hover animate-slide-up">
    <h3 className="text-lg font-bold mb-4 text-slate-800">{title}</h3>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows="6"
      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
    />
  </div>
);

export default TasksList;
