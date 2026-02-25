"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ServiceStatus {
  name: string;
  status: "operational" | "degraded" | "down" | "maintenance";
  description?: string;
  lastUpdated?: string;
}

interface ServiceStatusResponse {
  status: "operational" | "degraded" | "down";
  services: ServiceStatus[];
  incident?: {
    title: string;
    description: string;
    started: string;
  };
}

export function ServiceStatus() {
  const [statusData, setStatusData] = useState<ServiceStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceStatus = async () => {
      try {
        // In a real implementation, this would fetch from your status API
        // For now, we'll use mock data that demonstrates the functionality
        const mockData: ServiceStatusResponse = {
          status: "operational",
          services: [
            {
              name: "API",
              status: "operational",
              description: "All API endpoints are responding normally",
              lastUpdated: new Date().toISOString()
            },
            {
              name: "Pipeline Execution",
              status: "operational",
              description: "Pipeline processing is running normally",
              lastUpdated: new Date().toISOString()
            },
            {
              name: "Data Storage",
              status: "operational",
              description: "All storage systems are operational",
              lastUpdated: new Date().toISOString()
            },
            {
              name: "Authentication",
              status: "operational",
              description: "Authentication services are working normally",
              lastUpdated: new Date().toISOString()
            }
          ]
        };

        // Simulate API delay
        setTimeout(() => {
          setStatusData(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch service status");
        setLoading(false);
      }
    };

    fetchServiceStatus();
    
    // Refresh status every 5 minutes
    const interval = setInterval(fetchServiceStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ServiceStatus["status"]) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "down":
        return "text-red-600 bg-red-50 border-red-200";
      case "maintenance":
        return "text-blue-600 bg-blue-50 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: ServiceStatus["status"]) => {
    switch (status) {
      case "operational":
        return "✅";
      case "degraded":
        return "⚠️";
      case "down":
        return "❌";
      case "maintenance":
        return "🔧";
      default:
        return "❓";
    }
  };

  const getOverallStatus = () => {
    if (!statusData) return { text: "Loading", color: "text-gray-600" };
    
    switch (statusData.status) {
      case "operational":
        return { text: "All Systems Operational", color: "text-green-600" };
      case "degraded":
        return { text: "Some Issues Detected", color: "text-yellow-600" };
      case "down":
        return { text: "Service Outage", color: "text-red-600" };
      default:
        return { text: "Status Unknown", color: "text-gray-600" };
    }
  };

  if (loading) {
    return (
      <div className="p-4 border rounded-lg bg-muted/20">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span className="text-sm text-muted-foreground">Loading service status...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
        <div className="flex items-center space-x-2">
          <span className="text-red-600">❌</span>
          <span className="text-sm text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-4">
      {/* Overall Status */}
      <div className="p-4 border rounded-lg bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Service Status</h3>
            <p className={`text-sm ${overallStatus.color}`}>
              {overallStatus.text}
            </p>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Individual Services */}
      <div className="grid gap-3">
        {statusData?.services.map((service) => (
          <div
            key={service.name}
            className={cn(
              "p-3 border rounded-lg",
              getStatusColor(service.status)
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(service.status)}</span>
                  <h4 className="font-medium">{service.name}</h4>
                </div>
                {service.description && (
                  <p className="text-sm mt-1 opacity-80">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="text-xs opacity-60">
                {service.lastUpdated && 
                  new Date(service.lastUpdated).toLocaleTimeString()
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Incident Banner */}
      {statusData?.incident && (
        <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-3">
            <span className="text-lg">⚠️</span>
            <div className="flex-1">
              <h4 className="font-medium text-yellow-800">
                {statusData.incident.title}
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                {statusData.incident.description}
              </p>
              <p className="text-xs text-yellow-600 mt-2">
                Started: {new Date(statusData.incident.started).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground">
        <p>
          Status updates automatically every 5 minutes. 
          View detailed status at{" "}
          <a 
            href="https://status.xether.ai" 
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            status.xether.ai
          </a>
        </p>
      </div>
    </div>
  );
}
