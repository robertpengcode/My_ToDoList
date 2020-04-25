const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, DATE } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/my_todolist_db"
);

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: STRING,
    allowNull: true,
    defaultValue: "https://www.fillmurray.com/200/300"
  }
});

const Task = conn.define("task", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  userId: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false
  }
});

Task.belongsTo(User);
User.hasMany(Task);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [Rob, Klaudia, Peter, Zoe] = await Promise.all([
    User.create({
      name: "Rob",
      imageURL: "https://www.fillmurray.com/200/300"
    }),
    User.create({
      name: "Klaudia",
      imageURL: "https://www.fillmurray.com/200/300"
    }),
    User.create({
      name: "Peter",
      imageURL: "https://www.fillmurray.com/200/300"
    }),
    User.create({ name: "Zoe", imageURL: "https://www.fillmurray.com/200/300" })
  ]);

  const [tk1, tk2, tk3, tk4, tk5, tk6, tk7, tk8] = await Promise.all([
    Task.create({
      name: "watering",
      category: "yardwork",
      userId: Rob.id
    }),
    Task.create({
      name: "washing clothes",
      category: "chore",
      userId: Klaudia.id
    }),
    Task.create({
      name: "do math practice",
      category: "study",
      userId: Peter.id
    }),
    Task.create({
      name: "cleaning toys",
      category: "chore",
      userId: Zoe.id
    }),
    Task.create({
      name: "building projects",
      category: "study",
      userId: Rob.id
    }),
    Task.create({
      name: "make report",
      category: "work",
      userId: Klaudia.id
    }),
    Task.create({
      name: "do math practice",
      category: "play",
      userId: Peter.id
    }),
    Task.create({
      name: "play with barbies",
      category: "play",
      userId: Zoe.id
    })
  ]);
};

User.findTasks = function() {
  return User.findAll({
    include: {
      model: Task,
      required: true
    }
  });
};

module.exports = {
  syncAndSeed,
  conn,
  models: {
    User,
    Task
  }
};
