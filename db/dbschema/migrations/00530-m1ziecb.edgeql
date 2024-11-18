CREATE MIGRATION m1ziecbcwidhxtkubyukpinosdzqmrk3vkzg2mnt3gxk7eifikuodq
    ONTO m1azdas7z23v5ddaf3fr6tvqmi4oogoy27sw4u7u3t7z7qfb3rqboa
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY isDisplay: std::bool;
  };
};
