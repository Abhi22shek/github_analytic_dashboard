import React from 'react';
import { Link } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import {Button} from '../component/common'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <FiAlertCircle className="w-20 h-20 text-gray-400 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};
