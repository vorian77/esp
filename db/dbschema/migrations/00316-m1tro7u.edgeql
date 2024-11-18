CREATE MIGRATION m1tro7unoc3xx45bvaukvybukfa6bjprruoznnvh57zfzgfaoaywia
    ONTO m1y3gsqe3gqd5gswmn2qcqcit5cyxz6ibpjwhjnxxae245wr2djioa
{
  ALTER TYPE sys_rep::SysRepEl {
      CREATE PROPERTY description: std::str;
  };
};
