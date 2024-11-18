CREATE MIGRATION m1qhh46a72hky2jvj323empzvo7vp76nwc2acegpenf52voh2uwuzq
    ONTO m1ppqo27kk5c2fm5hy6xxweuxn5twh7ez5dp2fgde24mtp3i6ga7lq
{
      ALTER TYPE sys_rep::SysRepUserEl {
      CREATE LINK column: sys_db::SysColumn;
  };
};
