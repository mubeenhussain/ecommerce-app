import categoryModal from '../models/categoryModal.js';
import slugify from 'slugify';
export const createCategoryController =async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:"Name is required"});
        }
        const existingCategory = await categoryModal.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"Category Already Exists"
            })
        }
        const category = await new categoryModal({
            name,
            slug:slugify(name)
        }).save();
        res.status(201).send({
            success:true,
            message:"new category created",
            category
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCategoryController = async (req,res) => {
    try {
         const {name} = req.body;
         const {id} = req.params;
         const category = await categoryModal.findByIdAndUpdate(id,{
            name:name,
            slug:slugify(name)
         },{new:true});
         res.status(200).send({
            success:true,
            message:"Category updated successfully!",
            category
         })
    } catch (error) {
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

//get all category
export const categoryController = async (req,res) => {
    try {
       const category = await categoryModal.find({});
       res.status(200).send({
        success:true,
        message:"All Categories",
        category
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting all categories"
        })
    }
}

//get single category
export const singleCategoryController = async (req,res) => {
    try {
        const {slug} = req.params;
       const category = await categoryModal.findOne({slug});
       res.status(200).send({
        success:true,
        category
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while getting single Category"
        })
    }
}

//deleteCategoryController
export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;
        await categoryModal.findByIdAndDelete(id);
        res.status(200).send({
         success:true,
         
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error while deleting single Category"
        })
    }
}