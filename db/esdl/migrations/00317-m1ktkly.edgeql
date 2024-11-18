CREATE MIGRATION m1ktklydmwo4cyuyn6nlrmasbtydh7byfvibrtaczwyt7zz53vutaa
    ONTO m1tro7unoc3xx45bvaukvybukfa6bjprruoznnvh57zfzgfaoaywia
{
      ALTER TYPE sys_rep::SysRepAnalytic {
      CREATE PROPERTY name: std::str;
  };
};
