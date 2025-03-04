CREATE MIGRATION m1j4lxjglfwetvu35sm37u4c6mj5duxhwnr6vvin3pcre2gr2b7puq
    ONTO m1zvuwwb6kw7ujmqueeoox4bsv3kvy2uvwvfqx3msaribaul2mdfsq
{
              ALTER TYPE sys_core::SysDataObjListEditDataMapItem {
      ALTER LINK columns {
          RENAME TO column;
      };
  };
};
