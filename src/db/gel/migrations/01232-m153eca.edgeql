CREATE MIGRATION m153ecakprzzo3ehyf4eanzijjn2yys7oxqk4tkukeovgrold4ftta
    ONTO m1z4vegji7awtzmsuzrksxi6yafuejfnjs5wqfmenmoi5gmsownrpa
{
  ALTER TYPE sys_core::SysNodeObjAction {
      DROP CONSTRAINT std::exclusive ON ((.codeAction, .nodeObj));
  };
};
