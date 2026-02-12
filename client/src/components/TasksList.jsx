import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ArrowLeft,
  Download,
  Plus,
  AlertCircle,
  Trash2,
  FolderPlus,
} from 'lucide-react';
import TaskItem from './TaskItem';
import TaskGroup from './TaskGroup';
import ExportModal from './ExportModal';
import LoadingSpinner from './LoadingSpinner';
import { getSpecification, updateSpecification, deleteSpecification } from '../services/api';

const TasksList = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [specification, setSpecification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);

  useEffect(() => {
    fetchSpecification();
  }, [id]);

  const fetchSpecification = async () => {
    try {
      setLoading(true);
      const response = await getSpecification(id);
      setSpecification(response.data);
    } catch (err) {
      setError('Failed to load specification');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async (updatedData) => {
    try {
      await updateSpecification(id, updatedData);
    } catch (err) {
      console.error('Failed to save changes:', err);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'TASK') {
      const updatedTasks = Array.from(specification.tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);

      // Update groupId based on destination
      if (destination.droppableId === 'ungrouped') {
        movedTask.groupId = null;
      } else {
        movedTask.groupId = destination.droppableId;
      }

      updatedTasks.splice(destination.index, 0, movedTask);

      // Update order
      updatedTasks.forEach((task, index) => {
        task.order = index;
      });

      const updatedSpec = { ...specification, tasks: updatedTasks };
      setSpecification(updatedSpec);
      saveChanges({ tasks: updatedTasks });
    }
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = specification.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    const updatedSpec = { ...specification, tasks: updatedTasks };
    setSpecification(updatedSpec);
    saveChanges({ tasks: updatedTasks });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = specification.tasks.filter((task) => task.id !== taskId);
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
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };

    const updatedGroups = [...(specification.groups || []), newGroup];
    const updatedSpec = { ...specification, groups: updatedGroups };
    setSpecification(updatedSpec);
    saveChanges({ groups: updatedGroups });
    setNewGroupName('');
    setShowNewGroupForm(false);
  };

  const handleUpdateGroup = (updatedGroup) => {
    const updatedGroups = specification.groups.map((group) =>
      group.id === updatedGroup.id ? updatedGroup : group
    );
    const updatedSpec = { ...specification, groups: updatedGroups };
    setSpecification(updatedSpec);
    saveChanges({ groups: updatedGroups });
  };

  const handleDeleteGroup = (groupId) => {
    if (window.confirm('Are you sure you want to delete this group? Tasks will be moved to ungrouped.')) {
      // Move tasks from this group to ungrouped
      const updatedTasks = specification.tasks.map((task) =>
        task.groupId === groupId ? { ...task, groupId: null } : task
      );
      const updatedGroups = specification.groups.filter((group) => group.id !== groupId);
      const updatedSpec = { ...specification, tasks: updatedTasks, groups: updatedGroups };
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
    if (window.confirm('Are you sure you want to delete this entire specification?')) {
      try {
        await deleteSpecification(id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete specification');
      }
    }
  };

  if (loading) {
    return (
      <div className="tasks-page">
        <div className="tasks-container">
          <LoadingSpinner text="Loading specification..." />
        </div>
      </div>
    );
  }

  if (error || !specification) {
    return (
      <div className="tasks-page">
        <div className="tasks-container">
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error || 'Specification not found'}</span>
          </div>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const ungroupedTasks = specification.tasks.filter((task) => !task.groupId);
  const userStories = ungroupedTasks.filter((t) => t.type === 'user_story');
  const engineeringTasks = ungroupedTasks.filter((t) => t.type === 'engineering_task');

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        {/* Header */}
        <div className="tasks-header">
          <button onClick={() => navigate('/')} className="btn-icon">
            <ArrowLeft size={20} />
          </button>
          <h1 className="tasks-title">Specification Details</h1>
          <div className="tasks-actions">
            <button onClick={() => setShowExportModal(true)} className="btn btn-secondary">
              <Download size={18} />
              Export
            </button>
            <button onClick={handleDeleteSpecification} className="btn btn-danger">
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* Feature Idea Summary */}
        <div className="feature-summary">
          <h2>Feature Idea</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Goal:</span>
              <p>{specification.featureIdea.goal}</p>
            </div>
            <div className="summary-item">
              <span className="summary-label">Users:</span>
              <p>{specification.featureIdea.users}</p>
            </div>
            <div className="summary-item">
              <span className="summary-label">Constraints:</span>
              <p>{specification.featureIdea.constraints}</p>
            </div>
            <div className="summary-item">
              <span className="summary-label">Template:</span>
              <p>{specification.featureIdea.template}</p>
            </div>
          </div>
        </div>

        {/* Risks and Unknowns */}
        <div className="risks-unknowns-section">
          <div className="risk-card">
            <h3>🚨 Risks</h3>
            <textarea
              value={specification.risks || ''}
              onChange={(e) => handleUpdateRisks(e.target.value)}
              className="risk-textarea"
              placeholder="Identify potential risks..."
              rows="4"
            />
          </div>
          <div className="risk-card">
            <h3>❓ Unknowns</h3>
            <textarea
              value={specification.unknowns || ''}
              onChange={(e) => handleUpdateUnknowns(e.target.value)}
              className="risk-textarea"
              placeholder="List open questions and unknowns..."
              rows="4"
            />
          </div>
        </div>

        {/* Task Groups */}
        {specification.groups && specification.groups.length > 0 && (
          <div className="groups-section">
            <h2>Task Groups</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
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
            </DragDropContext>
          </div>
        )}

        {/* Create New Group */}
        <div className="new-group-section">
          {showNewGroupForm ? (
            <div className="new-group-form">
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name..."
                className="new-group-input"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateGroup()}
              />
              <button onClick={handleCreateGroup} className="btn btn-primary btn-sm">
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewGroupForm(false);
                  setNewGroupName('');
                }}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowNewGroupForm(true)}
              className="btn btn-outline"
            >
              <FolderPlus size={18} />
              Create Task Group
            </button>
          )}
        </div>

        {/* Ungrouped Tasks */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="tasks-section">
            <h2>User Stories ({userStories.length})</h2>
            <Droppable droppableId="ungrouped" type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`tasks-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                >
                  {userStories.length === 0 ? (
                    <div className="empty-state-small">
                      <p>No user stories yet</p>
                    </div>
                  ) : (
                    userStories.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <TaskItem
                              task={task}
                              onUpdate={handleUpdateTask}
                              onDelete={handleDeleteTask}
                              provided={provided}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div className="tasks-section">
            <h2>Engineering Tasks ({engineeringTasks.length})</h2>
            <Droppable droppableId="ungrouped" type="TASK">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`tasks-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
                >
                  {engineeringTasks.length === 0 ? (
                    <div className="empty-state-small">
                      <p>No engineering tasks yet</p>
                    </div>
                  ) : (
                    engineeringTasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={userStories.length + index}
                      >
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} {...provided.draggableProps}>
                            <TaskItem
                              task={task}
                              onUpdate={handleUpdateTask}
                              onDelete={handleDeleteTask}
                              provided={provided}
                              isDragging={snapshot.isDragging}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        {/* Export Modal */}
        {showExportModal && (
          <ExportModal specification={specification} onClose={() => setShowExportModal(false)} />
        )}
      </div>
    </div>
  );
};

export default TasksList;