CREATE MIGRATION m1ml2zdgyranvjoim7eoxhg5bcdzs7misbtfo4ggn772h2okip4aza
    ONTO m1crutxpav5d3lfwdsixcs54cier5yt2wxfza7rtglo7m6rwim7nqa
{
  ALTER TYPE sys_db::SysColumn {
      CREATE LINK linkTable: sys_db::SysTable;
  };
};
