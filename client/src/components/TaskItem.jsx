import React, { useState } from 'react';
import { GripVertical, Edit2, Trash2, Save, X } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete, provided, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ef4444';
      case 'medium':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={`task-item ${isDragging ? 'dragging' : ''} ${
        task.type === 'user_story' ? 'user-story' : 'engineering-task'
      }`}
    >
      <div className="task-drag-handle" {...provided.dragHandleProps}>
        <GripVertical size={18} />
      </div>

      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-form">
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="task-edit-title"
              placeholder="Task title"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="task-edit-description"
              placeholder="Task description"
              rows="3"
            />
            <div className="task-edit-actions">
              <select
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
                className="task-edit-priority"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
              <div className="task-edit-buttons">
                <button onClick={handleSave} className="btn-icon btn-success">
                  <Save size={16} />
                </button>
                <button onClick={handleCancel} className="btn-icon btn-secondary">
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="task-header">
              <h4 className="task-title">{task.title}</h4>
              <span
                className="task-priority"
                style={{ backgroundColor: getPriorityColor(task.priority) }}
              >
                {task.priority}
              </span>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-meta">
              <span className="task-type">
                {task.type === 'user_story' ? '📖 User Story' : '⚙️ Engineering Task'}
              </span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={() => setIsEditing(true)}
            className="btn-icon"
            title="Edit task"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="btn-icon btn-danger"
            title="Delete task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;