CREATE MIGRATION m1ztd3y5sdnvwipxguhant35imyf5wgdgi3ccgcxtwgw6fhmeyhmua
    ONTO m1thww3r6p26xltlcndylnzmdean5vsqwhypqfsjr5ok5vz62iheba
{
              ALTER TYPE sys_rep::SysRepParm {
      CREATE PROPERTY isRequired: std::bool;
  };
};
