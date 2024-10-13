import { prisma } from "../db/db.js";
export const dashboardCount = async (req, res) => {
  try {
    let residenceCount = await prisma.residents.count();
    let contractorCount = await prisma.contractors.count();
    let assetsCount = await prisma.assets.count();
    let workOrdersCount = await prisma.workOrders.count();
    let caseCount = await prisma.caseDetails.count({
      where: {
        status: false,
      },
    });

    res.status(200).json({
      message: "count fetched successfully",
      data: {
        residenceCount: residenceCount,
        contractorCount: contractorCount,
        assetsCount: assetsCount,
        caseCount: caseCount,
        workOrdersCount: workOrdersCount,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const dynamicSearch = async (req, res) => {
  try {
    let { search } = req.body;
    let residenceData = await prisma.residents.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    let contractorData = await prisma.contractors.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
    res.status(200).json({
      message: "Successfull",
      data: [...residenceData, ...contractorData],
    });
  } catch (error) {

    res.status(400).json({
      message: error.message,
    });
  }
};

// Action
export const actionContainer = async (req, res) => {
  try {
    let caseCount = await prisma.caseDetails.count({
      where: {
        status: false,
      },
    });

    let currentDate = new Date();
    let sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);

    let contractorInsuranceCount = await prisma.contractors.count({
      where: {
        insurance_expire: {
          gte: currentDate,
          lte: sevenDaysFromNow,
        },
      },
    });

    let notRegisteredResidence = await prisma.residents.count({
      where: {
        status: false,
      },
    });

    res.status(200).json({
      message: "Details fetched successfully",
      data: {
        caseCount: caseCount,
        contractorInsuranceCount: contractorInsuranceCount,
        notRegisteredResidence: notRegisteredResidence,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getReport = async (req, res) => {
  try {
    let data = req.query.name;
    const documentData = await prisma.document.findMany({
      where: {
        name: data,
      },
    });

    res.status(200).json({
      message: "Details fetched successfully",
      data: {
        documentData,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Add Data to db
// PDF
export const storePDF = async (req, res) => {
  try {
    const file = req.file;
    const { name } = req.body;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let storeDocument = await prisma.document.create({
      data: {
        name: name,
        location: file.path,
      },
    });
    res.status(200).json({
      message: "Successfull",
      data: storeDocument,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to store pdf",
    });
  }
};

export const addResidents = async (req, res) => {
  try {
    const { name, email, phone_no, apt_name, status, asset_name } = req.body;
    let response = await prisma.residents.create({
      data: {
        name: name,
        email: email,
        phone_no: phone_no,
        apt_name: apt_name,
        status: status,
        Assets: {
          create: {
            asset_name: asset_name,
          },
        },
      },
    });
    res.status(200).json({
      message: "Data stored successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const contractors = async (req, res) => {
  try {
    const { name, email, phone_no, insurance, insurance_expire,work_desc,status } = req.body;
    let response = await prisma.contractors.create({
      data: {
        name: name,
        email: email,
        phone_no: phone_no,
        insurance: insurance,
        insurance_expire: insurance_expire,
        WorkOrders:{
          create:{
            work_desc:work_desc,
            status:status,
          }
        }
      },
    });
    res.status(200).json({ message: "Data stored Successly" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const activeCases = async (req, res) => {
  try {
    let { name, status } = req.body;
    let response = await prisma.caseDetails.create({
      data: {
        name: name,
        status: status,
      },
    });
    res.status(200).json({ message: "Data stored sucessfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
