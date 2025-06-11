CREATE MIGRATION m1j4zq5hjqfbf6nv7dfzi2pj5wbqrqudmbtfbxfapi4zif7wve3wfq
    ONTO m153ecakprzzo3ehyf4eanzijjn2yys7oxqk4tkukeovgrold4ftta
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY selectListItemsHeader: std::str;
  };
};
