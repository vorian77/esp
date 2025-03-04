CREATE MIGRATION m14yy6456yh47rju3sz266z5nmx5oa4j6kuiqlru5srwg63eghm3lq
    ONTO m1hlncjynxcqzet6q7gig34hs4qas5stgt26twzoqaw6mwecafwe7q
{
                  ALTER TYPE sys_rep::SysRepEl {
      ALTER PROPERTY name {
          RESET OPTIONALITY;
      };
  };
};
