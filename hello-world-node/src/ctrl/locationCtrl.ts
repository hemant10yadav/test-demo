import { NextFunction, Response, Request } from 'express';
import User from '../models/user';

export async function saveUserLocation(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Extract user data from request body
		const { name, email, lat, long, place, country } = req.body;

		// Validate request body
		if (!name || !email || !lat || !long || !place || !country) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		// Check if user with the provided email already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			// If the user already exists, update the user's country, place, latitude, and longitude
			existingUser.country = country;
			existingUser.place = place;
			existingUser.lat = lat;
			existingUser.long = long;

			// Save the updated user to the database
			await existingUser.save();

			// Respond with success message
			return res
				.status(200)
				.json({
					message: 'User location updated successfully',
					user: existingUser,
				});
		}

		// Create a new user
		const newUser = new User({ name, email, lat, long, place, country });

		// Save the user to the database
		await newUser.save();

		// Respond with success message
		res
			.status(201)
			.json({ message: 'User location saved successfully', user: newUser });
	} catch (error) {
		// Handle errors
		console.error('Error saving user location:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}

export async function getAllUsers(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// Retrieve all users from the database
		const users = await User.find({});

		// Respond with the retrieved users
		res.status(200).json(users);
	} catch (error) {
		// Handle errors
		console.error('Error retrieving users:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
}
