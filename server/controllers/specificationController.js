// const Specification = require("../models/Specification");
// const { openrouter } = require("../config/openrouter");
// const { buildPrompt } = require("../utils/promptBuilder");

// const generateSpecification = async (req, res) => {
//   try {
//     const { goal, users, constraints, template = "custom" } = req.body;

//     const prompt = buildPrompt({ goal, users, constraints, template });

//     const response = await openrouter.chat.completions.create({
//       model: "mistralai/mistral-7b-instruct",
//       messages: [{ role: "user", content: prompt }],
//       max_tokens: 2000,
//       temperature: 0.7,
//     });

//     const responseText = response.choices[0]?.message?.content;

//     if (!responseText) {
//       throw new Error("Empty AI response");
//     }

//     // Parse JSON safely
//     let parsedData;

//     try {
//       // Extract first JSON object from text
//       const jsonMatch = responseText.match(/\{[\s\S]*\}/);

//       if (!jsonMatch) {
//         throw new Error("No JSON object found in AI response");
//       }

//       parsedData = JSON.parse(jsonMatch[0]);
//     } catch (err) {
//       console.error("AI raw response:", responseText);
//       throw new Error("Failed to parse AI response");
//     }

//     // Transform tasks
//     const tasks = [];
//     let order = 0;

//     if (Array.isArray(parsedData.userStories)) {
//       parsedData.userStories.forEach((story) => {
//         tasks.push({
//           id: `story-${Date.now()}-${order}`,
//           type: "user_story",
//           title: story.title,
//           description: story.description,
//           priority: story.priority || "medium",
//           order: order++,
//         });
//       });
//     }

//     if (Array.isArray(parsedData.engineeringTasks)) {
//       parsedData.engineeringTasks.forEach((task) => {
//         tasks.push({
//           id: `task-${Date.now()}-${order}`,
//           type: "engineering_task",
//           title: task.title,
//           description: task.description,
//           priority: task.priority || "medium",
//           order: order++,
//         });
//       });
//     }

//     const specification = new Specification({
//       featureIdea: { goal, users, constraints, template },
//       tasks,
//       groups: [],
//       risks: parsedData.risks || "",
//       unknowns: parsedData.unknowns || "",
//     });

//     await specification.save();

//     res.status(201).json({
//       success: true,
//       data: specification,
//     });
//   } catch (error) {
//     console.error("Generate Specification Error:", error);
//     res.status(500).json({
//       success: false,
//       error: error.message || "Failed to generate specification",
//     });
//   }
// };

// // Get recent specifications (last 5)
// const getRecentSpecifications = async (req, res) => {
//   try {
//     const specifications = await Specification.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("featureIdea.goal featureIdea.template generatedAt createdAt");

//     res.json({
//       success: true,
//       data: specifications,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Get single specification by ID
// const getSpecification = async (req, res) => {
//   try {
//     const specification = await Specification.findById(req.params.id);

//     if (!specification) {
//       return res.status(404).json({
//         success: false,
//         error: "Specification not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: specification,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Update specification
// const updateSpecification = async (req, res) => {
//   try {
//     const { tasks, groups, risks, unknowns } = req.body;

//     const specification = await Specification.findById(req.params.id);

//     if (!specification) {
//       return res.status(404).json({
//         success: false,
//         error: "Specification not found",
//       });
//     }

//     if (tasks) specification.tasks = tasks;
//     if (groups) specification.groups = groups;
//     if (risks !== undefined) specification.risks = risks;
//     if (unknowns !== undefined) specification.unknowns = unknowns;

//     await specification.save();

//     res.json({
//       success: true,
//       data: specification,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // Delete specification
// const deleteSpecification = async (req, res) => {
//   try {
//     const specification = await Specification.findById(req.params.id);

//     if (!specification) {
//       return res.status(404).json({
//         success: false,
//         error: "Specification not found",
//       });
//     }

//     await specification.deleteOne();

//     res.json({
//       success: true,
//       message: "Specification deleted",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   generateSpecification,
//   getRecentSpecifications,
//   getSpecification,
//   updateSpecification,
//   deleteSpecification,
// };
const Specification = require('../models/Specification');
const { openrouter } = require('../config/openrouter');
const { buildPrompt } = require('../utils/promptBuilder');

// Generate new specification
const generateSpecification = async (req, res) => {
  try {
    const { goal, users, constraints, template = 'custom' } = req.body;

    // Build prompt
    const prompt = buildPrompt({ goal, users, constraints, template });

    // Call OpenRouter API with Claude model
    const completion = await openrouter.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet', // Or use 'anthropic/claude-3-opus' for more powerful model
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 4000,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;

    if (!responseText) {
      throw new Error('No response from AI');
    }

    // Parse JSON response
    let parsedData;
    try {
      // Remove markdown code blocks if present
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsedData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      throw new Error('Failed to parse AI response. Please try again.');
    }

    // Transform to our task format
    const tasks = [];
    let taskOrder = 0;

    // Add user stories
    if (parsedData.userStories && Array.isArray(parsedData.userStories)) {
      parsedData.userStories.forEach((story) => {
        tasks.push({
          id: `story-${Date.now()}-${taskOrder}`,
          type: 'user_story',
          title: story.title,
          description: story.description,
          priority: story.priority || 'medium',
          order: taskOrder++,
        });
      });
    }

    // Add engineering tasks
    if (parsedData.engineeringTasks && Array.isArray(parsedData.engineeringTasks)) {
      parsedData.engineeringTasks.forEach((task) => {
        tasks.push({
          id: `task-${Date.now()}-${taskOrder}`,
          type: 'engineering_task',
          title: task.title,
          description: task.description,
          priority: task.priority || 'medium',
          order: taskOrder++,
        });
      });
    }

    // Create specification
    const specification = new Specification({
      featureIdea: { goal, users, constraints, template },
      tasks,
      groups: [],
      risks: parsedData.risks || '',
      unknowns: parsedData.unknowns || '',
    });

    await specification.save();

    res.status(201).json({
      success: true,
      data: specification,
    });
  } catch (error) {
    console.error('Generate Specification Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate specification',
    });
  }
};

// Get recent specifications (last 5)
const getRecentSpecifications = async (req, res) => {
  try {
    const specifications = await Specification.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('featureIdea.goal featureIdea.template generatedAt createdAt');

    res.json({
      success: true,
      data: specifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single specification by ID
const getSpecification = async (req, res) => {
  try {
    const specification = await Specification.findById(req.params.id);

    if (!specification) {
      return res.status(404).json({
        success: false,
        error: 'Specification not found',
      });
    }

    res.json({
      success: true,
      data: specification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update specification
const updateSpecification = async (req, res) => {
  try {
    const { tasks, groups, risks, unknowns } = req.body;

    const specification = await Specification.findById(req.params.id);

    if (!specification) {
      return res.status(404).json({
        success: false,
        error: 'Specification not found',
      });
    }

    if (tasks) specification.tasks = tasks;
    if (groups) specification.groups = groups;
    if (risks !== undefined) specification.risks = risks;
    if (unknowns !== undefined) specification.unknowns = unknowns;

    await specification.save();

    res.json({
      success: true,
      data: specification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete specification
const deleteSpecification = async (req, res) => {
  try {
    const specification = await Specification.findById(req.params.id);

    if (!specification) {
      return res.status(404).json({
        success: false,
        error: 'Specification not found',
      });
    }

    await specification.deleteOne();

    res.json({
      success: true,
      message: 'Specification deleted',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateSpecification,
  getRecentSpecifications,
  getSpecification,
  updateSpecification,
  deleteSpecification,
};