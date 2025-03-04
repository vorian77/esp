CREATE MIGRATION m1hlncjynxcqzet6q7gig34hs4qas5stgt26twzoqaw6mwecafwe7q
    ONTO m15x7qiyoharw47aiergev7awejy4c45dbe26wnxbwf6nlrgnxuk4q
{
                  ALTER TYPE sys_rep::SysRepElCol {
      CREATE LINK column: sys_db::SysColumn;
      ALTER PROPERTY expr {
          RESET OPTIONALITY;
      };
  };
};
