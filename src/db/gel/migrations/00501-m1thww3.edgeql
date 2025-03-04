CREATE MIGRATION m1thww3r6p26xltlcndylnzmdean5vsqwhypqfsjr5ok5vz62iheba
    ONTO m1iwmkr33ldf3aibiebh4g7zqpx5vphkf237q22f4twpzaedcraqva
{
              ALTER TYPE sys_core::SysDataObjActionField {
      ALTER PROPERTY isListEdit {
          RENAME TO isListRowAction;
      };
  };
};
