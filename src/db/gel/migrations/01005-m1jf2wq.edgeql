CREATE MIGRATION m1jf2wq2co7wbmbh4k2insv5giwnoywulmg3bjd4spn4cna4sudsza
    ONTO m1uxtj4ydd3ggu5dybou7sh5zhruczgdyxoikemf7qsy7por75i3rq
{
  ALTER TYPE sys_core::SysNodeObj {
      CREATE PROPERTY isDynamicChildrenSystemEntities: std::bool;
  };
};
